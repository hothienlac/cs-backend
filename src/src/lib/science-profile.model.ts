import {
    IPersonalInformation,
    IEducation,
    ICareer,
    IForeignLanguage,
    IExperienceAndResearches
} from './science-profile';
import { IBaseEntityModel } from './base-entity.model';


export interface IScienceProfile extends IBaseEntityModel{
    personalInformation?: IPersonalInformation;
    education?: IEducation[];
    career?: ICareer[];
    foreignLanguages?: IForeignLanguage[];
    experienceAndResearches?: IExperienceAndResearches;
}

