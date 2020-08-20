import { GridTableModule } from './grid-table.module';

describe('GridTableModule', () => {
  let gridTableModule: GridTableModule;

  beforeEach(() => {
    gridTableModule = new GridTableModule();
  });

  it('should create an instance', () => {
    expect(gridTableModule).toBeTruthy();
  });
});
