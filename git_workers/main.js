import DDP from 'ddp';
import Job from 'meteor-job';

/* eslint-disable no-console */

// Ensure that the callback is not called multiple times
const ddp = new DDP(
  {
    host: 'localhost',
    port: 3000,
    use_ejson: true,
    use_ssl: false,
    autoReconnect: true,
    autoReconnectTimer: 30000,
  }
);

Job.setDDP(ddp);

const once = (func, label) => {
  let called = false;
  return () => {
    if (!called) {
      called = true;
      console.log(`Callback called! ${label}`);
      func();
    } else {
      console.warn('Callback invoked multiple times!', label);
    }
  };
};

const proceed = (userId = null) => {
  ddp.subscribe('allJobs', [userId], () => {
    console.log('allJobs Ready!');
  });

  const q = Job.processJobs(
    'repos',
    'clone',
    { pollInterval: false, workTimeout: 60 * 1000 },
    (job, cb) => {
      // let count = 0;
      console.log(`Starting job ${job.doc} run ${job.doc.runId}`);
      // TODO: process git clone
      job.done(once(cb, 'Done'));
    }
  );

  const obs = ddp.observe('repos.jobs');

  obs.added = (id) => {
    if (ddp.collections['repos.jobs'][id].status === 'ready') {
      console.log('Triggering queue, added');
      q.trigger();
    }
  };

  obs.changed = (id, oldFields, clearedFields, newFields) => {
    if (newFields.status === 'ready') {
      console.log('Triggering queue, changed');
      q.trigger();
    }
  };

  const shutdown = (level = 'soft') => {
    console.log('Attempting to shutdown', level);
    q.shutdown(
      { level },
      () => {
        console.log('Shutdown!');
        ddp.close();
      }
    );
  };

  const onError = (err) => {
    console.error('Socket error!', err);
    shutdown('hard');
  };

  ddp.on('socket-error', onError);

  const onClose = (code, message) => {
    console.warn('Socket closed!', code, message);
    obs.stop();
    ddp.removeListener('socket-close', onClose);
    ddp.removeListener('socket-error', onError);
    process.exit();
  };
  ddp.on('socket-close', onClose);

  process.on('SIGQUIT', () => shutdown('normal'));
  process.on('SIGTERM', () => shutdown('hard'));
};

ddp.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected!');
  proceed();
  return;
});
