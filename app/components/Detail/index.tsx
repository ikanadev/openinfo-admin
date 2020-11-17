import React, { FC, memo } from 'react';

interface Props {
  name: string;
  value: string | null | undefined;
}

const Detail: FC<Props> = ({ name, value }) => {
  return (
    <p className="my-2 flex">
      <span className="font-medium">{name}</span>
      <span className={`${value ? '' : 'italic opacity-75'} ml-4 flex-1`}>{`${value || '(No definido)'}`}</span>
    </p>
  );
};

export default memo(Detail);
