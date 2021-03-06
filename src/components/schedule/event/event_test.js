/**
 * Copyright 2019 Arcus Project
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import $ from 'jquery';
import fixture from 'can-fixture/';
import assert from 'chai';
import loginAndRender from 'i2web/test/util/loginAndRender';
import { ViewModel } from './event';

let cleanupAfterRender;

describe('i2web/components/schedule/event', function favorite() {
  describe('functional tests', function functional() {
    before(function before() {
      fixture.reset();
    });

    beforeEach(function beforeEach(done) {
      loginAndRender({
        renderTo: '#test-area',
        template: '<arcus-schedule-event {message}="message" />',
        scope: {
          message: 'This is the arcus-schedule-event component',
        },
        appScope: {

        },
      }).then(({ cleanup }) => {
        cleanupAfterRender = cleanup;
        done();
      }).catch(() => {
        console.error(arguments);
        done();
      });
    });

    afterEach(function after(done) {
      cleanupAfterRender().then(() => {
        done();
      }).catch(() => {
        console.error(arguments);
        done();
      });
    });

    describe('rendering', function rendering() {
      it('shall be rendered on the page', function isRendered() {
        assert.lengthOf($('arcus-schedule-event'), 1, 'arcus-schedule-event is rendered');
      });
    });
  });

  describe('unit tests', function unitTests() {
    let vm;
    beforeEach(function beforeEach() {
      vm = new ViewModel();
    });
    describe('vm methods', function vmMethods() {
      it('shall compare events with areEventsEqual', function areEventsEqual() {
        const event = { days: ['MON', 'TUE'] };
        const formEvent = { days: ['TUE', 'MON'] };
        assert.ok(vm.areEventsEqual(event, formEvent));
      });
      it('should reset error on event setting', function formErrorReset() {
        vm.attr('formError', 'test');
        assert.ok(!!vm.attr('formError'));
        vm.attr('event', {});
        assert.ok(!vm.attr('formError'));
      });
    });
  });
});
