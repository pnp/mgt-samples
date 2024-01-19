import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import { Providers, customElementHelper } from "@microsoft/mgt-element";
import { registerMgtComponents } from "@microsoft/mgt-components";
import { SharePointProvider } from "@microsoft/mgt-sharepoint-provider";

export default class HelloWorldWebPart extends BaseClientSideWebPart<
  Record<string, unknown>
> {
  protected onInit(): Promise<void> {
    customElementHelper.withDisambiguation(
      "sp-mgt-no-framework-client-side-solution"
    );
    registerMgtComponents();
    if (!Providers.globalProvider) {
      Providers.globalProvider = new SharePointProvider(this.context);
    }
    return super.onInit();
  }

  public render(): void {
    this.domElement.innerHTML = `
    <section class="">
      ${this._renderMgtComponents()}
    </section>`;
  }

  private _renderMgtComponents(): string {
    return `
      <div class="">
        <h2>MGT Components</h2>
        <mgt-sp-mgt-no-framework-client-side-solution-person
          show-presence
          person-query="me"
          view="twoLines"
          person-card="hover"
        ></mgt-sp-mgt-no-framework-client-side-solution-person>
        <mgt-sp-mgt-no-framework-client-side-solution-people></mgt-sp-mgt-no-framework-client-side-solution-people>
        <mgt-sp-mgt-no-framework-client-side-solution-agenda></mgt-sp-mgt-no-framework-client-side-solution-agenda>
        <mgt-sp-mgt-no-framework-client-side-solution-people-picker></mgt-sp-mgt-no-framework-client-side-solution-people-picker>
        <mgt-sp-mgt-no-framework-client-side-solution-teams-channel-picker></mgt-sp-mgt-no-framework-client-side-solution-teams-channel-picker>
        <mgt-sp-mgt-no-framework-client-side-solution-tasks></mgt-sp-mgt-no-framework-client-side-solution-tasks>
      </div>
`;
  }
}
