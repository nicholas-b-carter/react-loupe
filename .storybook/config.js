import { configure } from '@kadira/storybook';

const req = require.context('./../', true, /[s|S]tories\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);