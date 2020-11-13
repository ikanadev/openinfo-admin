import React, { FC, useState, useEffect } from 'react';
import { useActions, useValues } from 'kea';

import Title from 'components/Title';
import SelectOption from 'components/SelectOption';
import NoItemsText from 'components/NoItemsText';
import LoaderWithText from 'components/LoaderWithText';
import Details from './Details';
import Members from './Members';

import { LeaderProject } from 'store/data/types';
import userProjectsLogic from 'store/data/userProjects';
import { ItemType } from 'types/common';

enum TabType {
  details = 'details',
  members = 'members',
}
const getProjectByID = (projects: LeaderProject[], id: number): LeaderProject => {
  const proy = projects.find((p) => p.id === id);
  if (!proy) return projects[0];
  return proy;
};

const EditActivities: FC = () => {
  const [selectedItemID, setSelectedItemID] = useState(0);
  const [selectedTab, setSelectedTab] = useState<TabType>(TabType.members);

  const { isFetched, isLoading, items } = useValues(userProjectsLogic);
  const { getItems } = useActions(userProjectsLogic);

  const setTab = (tab: TabType) => () => {
    setSelectedTab(tab);
  };
  const selectItem = (item: ItemType) => {
    setSelectedItemID(item.id);
  };
  useEffect(() => {
    if (!isFetched) getItems();
    if (isFetched && items.length > 0) {
      setSelectedItemID(items[0].id);
    }
  }, [isFetched]);

  if (isLoading) return <LoaderWithText text="Obteniendo sus proyectos..." />;
  if ((isFetched && items.length === 0) || selectedItemID === 0)
    return <NoItemsText text="Ups! parece que no tienes proyectos." />;
  if (!isFetched) return <NoItemsText error text="Error cargando tus proyectos, inténtalo más tarde." />;
  console.log(items, selectedItemID);
  return (
    <>
      <SelectOption
        label="Selecciona un Proyecto"
        items={items}
        setSelectedItem={selectItem}
        selectedItem={getProjectByID(items, selectedItemID)}
        noDefault
      />
      <Title text={getProjectByID(items, selectedItemID).nombre} />
      <div className="flex">
        <h2
          className={`${
            selectedTab === TabType.details ? 'text-teal-700 border-teal-600' : 'text-gray-500 border-gray-500'
          } flex-1 cursor-pointer py-2 text-center font-semibold text-base tracking-wide font-header border-b-2 transition duration-200`}
          onClick={setTab(TabType.details)}
        >
          DETALLES
        </h2>
        <h2
          className={`${
            selectedTab === TabType.members ? 'text-teal-700 border-teal-600' : 'text-gray-500 border-gray-500'
          } flex-1 cursor-pointer py-2 text-center font-semibold text-base tracking-wide font-header border-b-2 transition duration-200`}
          onClick={setTab(TabType.members)}
        >
          INTEGRANTES
        </h2>
      </div>
      <div className="overflow-x-hidden">
        <Details open={selectedTab === TabType.details} />
        <Members open={selectedTab === TabType.members} project={getProjectByID(items, selectedItemID)} />
      </div>
    </>
  );
};

export default EditActivities;
