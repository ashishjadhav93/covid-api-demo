import { CustomTableModule } from './custom-table.module';

describe('CustomTableModule', () => {
  let customTableModule: CustomTableModule;

  beforeEach(() => {
    customTableModule = new CustomTableModule();
  });

  it('should create an instance', () => {
    expect(customTableModule).toBeTruthy();
  });
});
