'use strict';

import "@babel/polyfill";//решает многие проблемы совместимости
import 'nodelist-foreach-polyfill';//подключ. полифил foreach для IE11
import elementClosest from 'element-closest';
elementClosest(window);//вызываем его
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';


import modalWindow from './modules/modalWindow';
import accordionTwo from './modules/accordionTwo';
import moreBlocks from './modules/moreBlocks';
import accordion from './modules/accordion';
import sendForm from './modules/sendForm';


modalWindow();

accordionTwo();

moreBlocks();

accordion();

sendForm();