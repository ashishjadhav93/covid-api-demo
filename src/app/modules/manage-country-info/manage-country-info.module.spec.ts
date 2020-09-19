import {ManageInfoModule } from './manage-info.module';

describe('manageInfoModule', () => {
  let manageInfoModule: ManageInfoModule;

  beforeEach(() => {
    manageInfoModule = new ManageInfoModule();
  });

  it('should create an instance', () => {
    expect(manageInfoModule).toBeTruthy();
  });
});
