import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import MgtLogin from './components/MgtLogin';
import { IMgtLoginProps } from './components/IMgtLoginProps';
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";

export interface IMgtLoginWebPartProps {
}

export default class MgtLoginWebPart extends BaseClientSideWebPart<IMgtLoginWebPartProps> {
	public render(): void {
		const element: React.ReactElement<IMgtLoginProps> = React.createElement(
			MgtLogin,
			{
			}
		);

		ReactDom.render(element, this.domElement);
	}

	protected async onInit(): Promise<void> {
		// Initialize the MGT Provider
		if (!Providers.globalProvider) {
			Providers.globalProvider = new SharePointProvider(this.context as any);
		}
	}

	protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
		if (!currentTheme) {
			return;
		}

		const { semanticColors } = currentTheme;

		if (semanticColors) {
			this.domElement.style.setProperty(
				"--bodyText",
				semanticColors.bodyText || null
			);
			this.domElement.style.setProperty("--link", semanticColors.link || null);
			this.domElement.style.setProperty(
				"--linkHovered",
				semanticColors.linkHovered || null
			);
		}
	}

	protected onDispose(): void {
		ReactDom.unmountComponentAtNode(this.domElement);
	}

	protected get dataVersion(): Version {
		return Version.parse("1.0");
	}

	protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
		return {
			pages: []
		};
	}
}
