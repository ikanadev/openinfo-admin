import React, { Fragment, FC } from 'react';

export interface AppProps {
  name: string;
}

const App: FC<AppProps> = (props: AppProps) => {
  return (
    <Fragment>
      <div>
        <div className="bg-white mx-auto max-w-lg shadow-lg rounded-lg overflow-hidden">
          <div className="sm:flex sm:items-center px-6 py-4">
            <img
              className="block h-16 sm:h-24 rounded-full mx-auto mb-4 sm:mb-0 sm:mr-4 sm:ml-0"
              src="https://avatars2.githubusercontent.com/u/4323180?s=400&u=4962a4441fae9fba5f0f86456c6c506a21ffca4f&v=4"
              alt=""
            />
            <div className="text-center sm:text-left sm:flex-grow">
              <div className="mb-4">
                <p className="text-xl leading-tight">Success!</p>
                <p className="text-sm leading-tight text-grey-dark">
                  {`Hello ${props.name}, you're in a React + TS + Tailwind CSS + Docker project ;)`}
                </p>
                <p className="text-sm leading-tight text-grey-dark">
                  {`Please add .env to your .gitignore, ${process.env.NAME}`}
                </p>
              </div>
              <div>
                <button className="text-xs font-semibold rounded-full px-4 py-1 leading-normal bg-white border border-purple text-purple hover:bg-purple hover:text-white">
                  A button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
