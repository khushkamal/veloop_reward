const { spawn } = require('child_process');
const path = require('path');

const isWindows = process.platform === 'win32';
const npmCmd = isWindows ? 'npm.cmd' : 'npm';

console.log('🚀 Starting VELoop Backend and Frontend together...\n');

const backend = spawn(npmCmd, ['--prefix', 'backend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

const frontend = spawn(npmCmd, ['--prefix', 'frontend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
  cwd: __dirname
});

const cleanUp = () => {
  try { backend.kill(); } catch (e) {}
  try { frontend.kill(); } catch (e) {}
  process.exit();
};

process.on('SIGINT', cleanUp);
process.on('SIGTERM', cleanUp);
process.on('exit', cleanUp);
