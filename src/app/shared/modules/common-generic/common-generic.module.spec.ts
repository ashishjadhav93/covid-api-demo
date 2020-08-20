import { CommonGenericModule } from './common-generic.module';

describe('CommonGenericModule', () => {
  let commonGenericModule: CommonGenericModule;

  beforeEach(() => {
    commonGenericModule = new CommonGenericModule();
  });

  it('should create an instance', () => {
    expect(commonGenericModule).toBeTruthy();
  });
});
