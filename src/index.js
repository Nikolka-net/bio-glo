'use strict';

import "@babel/polyfill";//решает многие проблемы совместимости
import 'nodelist-foreach-polyfill';//подключ. полифил foreach для IE11
import elementClosest from 'element-closest';
elementClosest(window);//вызываем его
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';