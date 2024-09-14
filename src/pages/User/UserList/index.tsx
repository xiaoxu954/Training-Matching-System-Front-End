import { listUserVoByPageUsingPost } from '@/services/request/MyUserController';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Space, Tag, Typography } from 'antd';
import React, { useRef, useState } from 'react';

/**
 * 用户管理页面
 *
 * @constructor
 */
const UserListPage: React.FC = () => {
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
      title: '用户名',
      dataIndex: 'userName',
      valueType: 'text',
    },
    {
      title: '头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      fieldProps: {
        width: 64,
      },
      hideInSearch: true,
    },
    {
      title: '简介',
      dataIndex: 'userProfile',
      valueType: 'textarea',
    },
    {
      title: '标签列表',
      dataIndex: 'tags',
      valueType: 'text',
      hideInSearch: true,
      render: (_, record) => (
        <>
          {record?.tags?.split(',').map((tag, index) => (
            <Tag key={index}>{tag}</Tag>
          ))}
        </>
      ),
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size="middle">
          <Typography.Link
            onClick={() => {
              setCurrentRow(record);
              setUpdateModalVisible(true);
            }}
          >
            联系他
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.User>
        headerTitle={'匹配用户列表'}
        actionRef={actionRef}
        rowKey="key"
        search={{
          labelWidth: 120,
        }}
        request={async (params, sort, filter) => {
          const sortField = Object.keys(sort)?.[0];
          const sortOrder = sort?.[sortField] ?? undefined;

          const { data } = await listUserVoByPageUsingPost({
            ...params,
            sortField,
            sortOrder,
            ...filter,
          } as any);

          return {
            success: true,
            data: data,
            total: Number(data.totalRow),
          };
        }}
        columns={columns}
      />
    </PageContainer>
  );
};
export default UserListPage;
