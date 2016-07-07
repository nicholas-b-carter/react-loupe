import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import Loupe from './Loupe';

storiesOf('Loupe', module)
    .add('default', () => (
        <Loupe
            image={'http://www.desktopwallpaper.cn/pic22/adllnorjoxhosoamfdrn.jpg'}
        ></Loupe>
    ))
    .add('with overriden styles', () => (
        <Loupe
            image={'http://www.desktopwallpaper.cn/pic22/adllnorjoxhosoamfdrn.jpg'}
            styles={{
                border: '1px solid green',
                height: '250px',
                width: '220px'
            }}
        ></Loupe>
    ))
    .add('with overriden loupe styles', () => (
        <Loupe
            image={'http://www.desktopwallpaper.cn/pic22/adllnorjoxhosoamfdrn.jpg'}
            loupeStyles={{
                border: '1px solid green',
                borderRadius: '50%'
            }}
        ></Loupe>
    ));
