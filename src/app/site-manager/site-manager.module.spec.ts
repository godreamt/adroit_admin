import { SiteManagerModule } from './site-manager.module';

describe('SiteManagerModule', () => {
  let siteManagerModule: SiteManagerModule;

  beforeEach(() => {
    siteManagerModule = new SiteManagerModule();
  });

  it('should create an instance', () => {
    expect(siteManagerModule).toBeTruthy();
  });
});
