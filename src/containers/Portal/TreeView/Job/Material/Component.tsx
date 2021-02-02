import * as React from 'react';
import Export from '../../../../../components/Export';
import Loading from '../../../../../components/Optimify/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { get } from 'lodash';
import { getPath, translationPath } from '../../../../../utils/getPath';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { IconTableCell } from './_styles';
import {
  JobProxy,
  JobRootObject,
  Model,
  NailPlate,
  Truss
  } from '../_types';
import { MainTreeContent, TreeContent, TreeScreen } from '../../../_styles';
import { Member } from '../_types';
import { RouteComponentProps } from 'react-router-dom';
import {
  ContentCard,
  MaterialTitleSection,
  FullCardEndTableWrapper,
  GridItemHalfHeight,
  GridRowFillContent,
  Header2,
} from '../../../../../constants/globalStyles';
import {
  faRectanglePortrait,
  faRectangleWide,
  faTriangle,
} from '@fortawesome/pro-light-svg-icons';
import {
  lang,
  t,
  WithTranslation,
  withTranslation,
} from '../../../../../translation/i18n';
import {
  ScrollableTable,
  TABLE_STYLE_CONDENSED,
} from '../../../../../components/Optimify/Table';

export interface StateProps {
  jobs: JobRootObject;
  history: any;
}

const Index = (props: WithTranslation & StateProps & RouteComponentProps) => {
  return (
    <MainTreeContent>
      <Loading
        text={t(translationPath(lang.common.loading))}
        pending={!props.jobs || !props.jobs?.Material}
        margin
      >
        <TreeScreen>
          <TreeContent>
            <GridRowFillContent columns={2}>
              <GridItemHalfHeight>
                <ContentCard fullSize>
                  <MaterialTitleSection>
                    <Header2>
                      {t(translationPath(lang.common.nailPlates))}
                    </Header2>
                    <Export
                      name={
                        props.jobs?.General?.Name +
                        '-' +
                        t(translationPath(lang.common.nailPlates))
                      }
                      data={get(
                        props.jobs,
                        getPath(JobProxy.Material.NailPlates)
                      )}
                      structure={[
                        {
                          label: t(translationPath(lang.common.name)),
                          valueName: 'Name',
                        },
                        {
                          label: t(translationPath(lang.common.trussCount)),
                          valueName: 'Count',
                        },
                      ]}
                    />
                  </MaterialTitleSection>
                  <FullCardEndTableWrapper>
                    <ScrollableTable
                      style={TABLE_STYLE_CONDENSED}
                      headers={[
                        t(translationPath(lang.common.name)),
                        t(translationPath(lang.common.count)),
                      ]}
                      sortable={[true, true]}
                      data={get(
                        props.jobs,
                        getPath(JobProxy.Material.NailPlates)
                      )?.map((value: NailPlate, key: number) => {
                        return [value.Name, value.Count, value];
                      })}
                      renderers={[
                        (value: any, key: number, parent: NailPlate) => {
                          return (
                            <IconTableCell>
                              <FontAwesomeIcon
                                icon={faRectanglePortrait as IconProp}
                              />{' '}
                              <span>{value}</span>
                            </IconTableCell>
                          );
                        },
                        (value: any, key: number, parent: NailPlate) => {
                          return value;
                        },
                      ]}
                    />
                  </FullCardEndTableWrapper>
                </ContentCard>
              </GridItemHalfHeight>
              <GridItemHalfHeight>
                <ContentCard fullSize>
                  <MaterialTitleSection>
                    <Header2>{t(translationPath(lang.common.members))}</Header2>
                    <Export
                      name={
                        props.jobs?.General?.Name +
                        '-' +
                        t(translationPath(lang.common.members))
                      }
                      data={get(props.jobs, getPath(JobProxy.Material.Members))}
                      structure={[
                        {
                          label: t(translationPath(lang.common.name)),
                          valueName: 'Name',
                        },
                        {
                          label: t(translationPath(lang.common.trussCount)),
                          valueName: 'Count',
                        },
                      ]}
                    />
                  </MaterialTitleSection>
                  <FullCardEndTableWrapper>
                    <ScrollableTable
                      style={TABLE_STYLE_CONDENSED}
                      headers={[
                        t(translationPath(lang.common.name)),
                        t(translationPath(lang.common.count)),
                      ]}
                      sortable={[true, true]}
                      data={get(
                        props.jobs,
                        getPath(JobProxy.Material.Members)
                      )?.map((value: Member, key: number) => {
                        return [value.Name, value.Count, value];
                      })}
                      renderers={[
                        (value: any, key: number, parent: Member) => {
                          return (
                            <IconTableCell>
                              <FontAwesomeIcon
                                icon={faRectangleWide as IconProp}
                              />
                              <span>{value}</span>
                            </IconTableCell>
                          );
                        },
                        (value: any, key: number, parent: Member) => {
                          return value;
                        },
                      ]}
                    />
                  </FullCardEndTableWrapper>
                </ContentCard>
              </GridItemHalfHeight>
              <GridItemHalfHeight>
                <ContentCard fullSize>
                  <MaterialTitleSection>
                    <Header2>{t(translationPath(lang.common.models))}</Header2>
                    <Export
                      name={
                        props.jobs?.General?.Name +
                        '-' +
                        t(translationPath(lang.common.models))
                      }
                      data={get(props.jobs, getPath(JobProxy.Material.Models))}
                      structure={[
                        {
                          label: t(translationPath(lang.common.name)),
                          valueName: 'Name',
                        },
                        {
                          label: t(translationPath(lang.common.trussCount)),
                          valueName: 'Count',
                        },
                        {
                          label: t(translationPath(lang.common.plyCount)),
                          valueName: 'PlyCount',
                        },
                      ]}
                    />
                  </MaterialTitleSection>
                  <FullCardEndTableWrapper>
                    <ScrollableTable
                      style={TABLE_STYLE_CONDENSED}
                      headers={[
                        t(translationPath(lang.common.name)),
                        t(translationPath(lang.common.count)),
                        t(translationPath(lang.common.plyCount)),
                      ]}
                      sortable={[true, true, true]}
                      data={get(
                        props.jobs,
                        getPath(JobProxy.Material.Models)
                      )?.map((value: Model, key: number) => {
                        return [value.Name, value.Count, value.PlyCount, value];
                      })}
                      renderers={[
                        (value: any, key: number, parent: Model) => {
                          return (
                            <IconTableCell>
                              <FontAwesomeIcon icon={faTriangle as IconProp} />
                              <span>{value}</span>
                            </IconTableCell>
                          );
                        },
                        (value: any, key: number, parent: Model) => {
                          return value;
                        },
                        (value: any, key: number, parent: Model) => {
                          return value;
                        },
                      ]}
                    />
                  </FullCardEndTableWrapper>
                </ContentCard>
              </GridItemHalfHeight>
            </GridRowFillContent>
          </TreeContent>
        </TreeScreen>
      </Loading>
    </MainTreeContent>
  );
};

export default withTranslation()(Index);
