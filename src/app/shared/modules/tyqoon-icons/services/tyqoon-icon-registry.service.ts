import { Injectable } from '@angular/core';
import { TyqoonIconI } from '../models/tyqoon-icon';

@Injectable()
export class TyqoonIconRegistryService {
	private readonly registry = new Map<string, string>();

	constructor() {}

	public registryIcons(icons: TyqoonIconI[]): void {
		icons.forEach((icon) => this.registry.set(icon.name, icon.data));
	}

	public getIcon(iconName: string): string | undefined {
		const registry = this.registry;
		if (!registry.has(iconName)) {
			console.warn(`Icon "${iconName}" not found. Please add to icon registry`);
		}
		return registry.get(iconName);
	}
}
