import { IpfsUIPage } from './app.po';

describe('ipfs-ui App', function() {
  let page: IpfsUIPage;

  beforeEach(() => {
    page = new IpfsUIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
