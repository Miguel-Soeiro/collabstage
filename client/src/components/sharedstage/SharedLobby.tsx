import React, { useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import ActorList from './ActorList';
import { IStageState } from '@server/types';
import { startPlay } from 'src/services/stageService';

interface ISharedLobbyProps {
  state: IStageState;
}

export default function SharedLobby({ state }: ISharedLobbyProps) {
  const backdrop = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/backgrounds/hogwarts.jpg')`,
  };

  return (
    <div className="flex w-screen h-screen items-center bg-opacity-50 -z-100 overflow-auto" style={backdrop}>
      <div className="flex flex-col justify-center mx-32">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body ">
            <h1 className="card-title text-6xl font-bold ">{state ? state.stageId : 'XXXX'}</h1>
            <p className="text-left text-xl font-bold mt-2">
              Scan the QR-Code or enter the code above to join this stage.
            </p>
          </div>
          <a href={`${state.stageId}/join`} target="_blank" rel="noreferrer">
            <QRCodeSVG
              className="m-4 align-center"
              value={`${window.location.host}/stage/${state.stageId}/join`}
              size={350}
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col mx-32">
        <div className="mb-4">{state && <ActorList actors={state.actors} />}</div>
        {state && (
          <button
            className={
              state.actors.length === 3 ? 'btn btn-primary text-white' : 'btn btn-primary btn-disabled btn-outline'
            }
            onClick={() => {
              const actorsWithCharacters = state.actors.filter((actor) => actor.character != null);
              if (state.actors.length === 3) {
                startPlay({ force: true });
              }
            }}
          >
            {state.actors.length === 3 ? 'Start Play' : 'Waiting for 3 players...'}
          </button>
        )}
      </div>
    </div>
  );
}
