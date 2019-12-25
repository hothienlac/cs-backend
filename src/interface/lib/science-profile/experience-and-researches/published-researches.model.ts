import { IPublishedResearch } from '.';

export interface IPublishedResearches{
    ISIPaper: IPublishedResearch[];
    otherInternationalPaper: IPublishedResearch[];
    nationalPaper: IPublishedResearch[];
    conferenceReports: IPublishedResearch[];
    other: IPublishedResearch[];
}