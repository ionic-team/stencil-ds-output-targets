import 'zone.js';
import 'zone.js/dist/zone-testing';

import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import 'jest-preset-angular';
import './jestGlobalMocks'; // browser mocks globally available for every test

TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
