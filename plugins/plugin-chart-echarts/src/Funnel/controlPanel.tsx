/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { FeatureFlag, isFeatureEnabled, t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  D3_FORMAT_OPTIONS,
  sections,
  sharedControls,
} from '@superset-ui/chart-controls';
import { DEFAULT_FORM_DATA, EchartsFunnelLabelTypeType } from './types';
import {
  legendMarginControl,
  legendOrientationControl,
  legendTypeControl,
  showLegendControl,
} from '../controls';

const {
  sort,
  orient,
  labelLine,
  labelType,
  numberFormat,
  showLabels,
  emitFilter,
} = DEFAULT_FORM_DATA;

const config: ControlPanelConfig = {
  controlPanelSections: [
    sections.legacyRegularTime,
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['groupby'],
        ['metric'],
        ['adhoc_filters'],
        [
          {
            name: 'row_limit',
            config: {
              ...sharedControls.row_limit,
              default: 10,
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        ['color_scheme'],
        isFeatureEnabled(FeatureFlag.DASHBOARD_CROSS_FILTERS)
          ? [
              {
                name: 'emit_filter',
                config: {
                  type: 'CheckboxControl',
                  label: t('Enable emitting filters'),
                  default: emitFilter,
                  renderTrigger: true,
                  description: t('Enable emmiting filters.'),
                },
              },
            ]
          : [],
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Legend')}</h1>],
        [showLegendControl],
        [legendTypeControl],
        [legendOrientationControl],
        [legendMarginControl],
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Labels')}</h1>],
        [
          {
            name: 'label_type',
            config: {
              type: 'SelectControl',
              label: t('Label Type'),
              default: labelType,
              renderTrigger: true,
              choices: [
                [EchartsFunnelLabelTypeType.Key, 'Category Name'],
                [EchartsFunnelLabelTypeType.Value, 'Value'],
                [EchartsFunnelLabelTypeType.Percent, 'Percentage'],
                [EchartsFunnelLabelTypeType.KeyValue, 'Category and Value'],
                [EchartsFunnelLabelTypeType.KeyPercent, 'Category and Percentage'],
                [EchartsFunnelLabelTypeType.KeyValuePercent, 'Category, Value and Percentage'],
              ],
              description: t('What should be shown on the label?'),
            },
          },
        ],
        [
          {
            name: 'number_format',
            config: {
              type: 'SelectControl',
              freeForm: true,
              label: t('Number format'),
              renderTrigger: true,
              default: numberFormat,
              choices: D3_FORMAT_OPTIONS,
              description: `${t('D3 format syntax: https://github.com/d3/d3-format')} ${t(
                'Only applies when "Label Type" is set to show values.',
              )}`,
            },
          },
        ],
        [
          {
            name: 'show_labels',
            config: {
              type: 'CheckboxControl',
              label: t('Show Labels'),
              renderTrigger: true,
              default: showLabels,
              description: t('Whether to display the labels.'),
            },
          },
        ],
        [
          {
            name: 'label_line',
            config: {
              type: 'CheckboxControl',
              label: t('Label Line'),
              default: labelLine,
              renderTrigger: true,
              description: t('Draw line from Funnel to label when labels outside?'),
            },
          },
        ],
        // eslint-disable-next-line react/jsx-key
        [<h1 className="section-header">{t('Funnel shape')}</h1>],
        [
          {
            name: 'sort',
            config: {
              type: 'SelectControl',
              label: t('sort'),
              default: sort,
              renderTrigger: true,
              choices: [
                [null, 'Default'],
                ['ascending', 'Ascending'],
                ['descending', 'Descending'],
              ],
              description: t('Sort data'),
            },
          },
          {
            name: 'orient',
            config: {
              type: 'SelectControl',
              label: t('orient'),
              default: orient,
              renderTrigger: true,
              choices: [
                [null, 'Default'],
                ['vertical', 'Vertical'],
                ['horizontal', 'Horizontal'],
              ],
              description: t('Funnel chart orientation. The options are vertical, horizontal'),
            },
          },
        ],
      ],
    },
  ],
};

export default config;
