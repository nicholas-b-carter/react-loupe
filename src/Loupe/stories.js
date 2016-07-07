import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Loupe from './Loupe';

storiesOf('Loupe', module)
    .add('default', () => (
        <Loupe
            image={'http://www.desktopwallpaper.cn/pic22/adllnorjoxhosoamfdrn.jpg'}
        ></Loupe>
    ))
    .add('with override styles', () => (
        <Loupe
            image={'http://www.desktopwallpaper.cn/pic22/adllnorjoxhosoamfdrn.jpg'}
            styles={{
                border: '1px solid green',
                height: '250px',
                width: '220px'
            }}
        ></Loupe>
    ));