import { listTeamByPageUsingPost } from '@/services/request/MyTeamController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Button, Space } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 用户管理页面
 *
 * @constructor
 */
const TeamListPage: React.FC = () => {
  // 是否显示新建窗口
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  // 是否显示更新窗口
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  // 当前用户点击的数据
  const [currentRow, setCurrentRow] = useState<API.User>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'text',
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '队伍名称',
      dataIndex: 'name',
      valueType: 'text',
    },

    {
      title: '简介',
      dataIndex: 'description',
      valueType: 'textarea',
    },
    {
      title: '最大人数',
      dataIndex: 'maxNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '过期时间',
      dataIndex: 'expireTime',
      valueType: 'dateTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      hideInSearch: true,
      valueEnum: {
        "0": {
          text: '公开',
        },
        "1": {
          text: '私有',
        },
        "2": {
          text: '加密',
        },
      },
      // render: (_, record) => (
      //   <Space size="middle">
      //     {record.status === 0 && <div>公开</div>}
      //     {record.status === 1 && <div>私有</div>}
      //     {record.status === 2 && <div>加密</div>}
      //   </Space>
      // ),
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            加入队伍
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Team>
        headerTitle={'匹配队伍列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data } = await listTeamByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as any);

          return {
            success: true,
            data: data.list,
            total: Number(data.totalRow),
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};
export default TeamListPage;
