import {PageNotFoundModule } from './page-not-found.module';

describe('pageNotFoundModule', () => {
  let pageNotFoundModule: PageNotFoundModule;

  beforeEach(() => {
    pageNotFoundModule = new PageNotFoundModule();
  });

  it('should create an instance', () => {
    expect(pageNotFoundModule).toBeTruthy();
  });
});
