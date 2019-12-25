import { IBaseEntityModel } from './base-entity.model';

export interface Role extends IBaseEntityModel {
	name: ERoles;
}

export enum ERoles {
	ADMIN = 'ADMIN',
	USER = 'USER',
}
