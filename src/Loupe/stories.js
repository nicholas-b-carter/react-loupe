import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Loupe from './Loupe';

storiesOf('Loupe', module)
    .add('with no classes', () => (
        <Loupe image={'http://www.desktopwallpaper.cn/pic22/adllnorjoxhosoamfdrn.jpg'}></Loupe>
    ));