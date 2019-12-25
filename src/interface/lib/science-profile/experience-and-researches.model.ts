// Modified code from https://github.com/xmlking/ngx-starter-kit.
// MIT License, see https://github.com/xmlking/ngx-starter-kit/blob/develop/LICENSE
// Copyright (c) 2018 Sumanth Chinthagunta

import { ILatestPublishedResearch } from './experience-and-researches/latest-published-research.model';
import { IPublishedResearches } from './experience-and-researches/published-researches.model';
import { IResearchInterest } from './experience-and-researches/research-interest.model';

export interface IExperienceAndResearches {
    latestPublishedResearches?: ILatestPublishedResearch[];
    publishedResearches?: IPublishedResearches;
    researchInterests?: IResearchInterest[];
}
  