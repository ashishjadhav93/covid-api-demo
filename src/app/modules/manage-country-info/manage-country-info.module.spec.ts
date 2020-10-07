import {ManageCountryInfoModule} from './manage-country-info.module';
describe('ManageCountryInfoModule', () => {
  let manageCountryInfoModule: ManageCountryInfoModule;

  beforeEach(() => {
    manageCountryInfoModule = new ManageCountryInfoModule();
  });

  it('should create an instance', () => {
    expect(manageCountryInfoModule).toBeTruthy();
  });
});