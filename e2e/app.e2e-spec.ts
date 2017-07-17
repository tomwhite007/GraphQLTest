import { GraphQLClientTestPage } from './app.po';

describe('graph-qlclient-test App', function() {
  let page: GraphQLClientTestPage;

  beforeEach(() => {
    page = new GraphQLClientTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
