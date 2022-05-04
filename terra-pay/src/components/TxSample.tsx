import { Fee, MsgSend } from '@terra-money/terra.js';
import {
  CreateTxFailed,
  Timeout,
  TxFailed,
  TxResult,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import React, { useCallback, useState } from 'react';

const TEST_TO_ADDRESS = 'erra1tdyzakcczg6dpv90j9hvu6mhehnceccdk2qc2m';

export function TxSample() {
  const [txResult, setTxResult] = useState<TxResult | null>(null);
  const [txError, setTxError] = useState<string | null>(null);
  var [amount, setAmount] = useState("");

  const connectedWallet = useConnectedWallet();

  const proceed = useCallback(() => {
    console.log("past:",amount)
    if (!connectedWallet) {
      return;
    }

    if (connectedWallet.network.chainID.startsWith('columbus')) {
      alert(`Please only execute this example on Testnet`);
      return;
    }

    setTxResult(null);
    setTxError(null);

    const _amount= parseInt(amount)*1000000;

    connectedWallet
      .post({
        fee: new Fee(1000000, '200000uusd'),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, TEST_TO_ADDRESS, {
            uusd: _amount,
          }),
        ],
      })
      .then((nextTxResult: TxResult) => {
        console.log(nextTxResult);
        setTxResult(nextTxResult);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError(
            'Unknown Error: ' +
            (error instanceof Error ? error.message : String(error)),
          );
        }
      });
  }, [amount]);

  return (
    <div className='App'>
      <h2>Pay With Terra</h2>

      <input
        className='input'
        type="text"
        onChange={(event) =>
          setAmount(event.target.value)
        }
        placeholder="Enter Amount"
      />
      {console.log("pre:",amount)}

      {connectedWallet?.availablePost && !txResult && !txError && (
        <button className='btn-pay' onClick={proceed} >Pay Ust</button>
      )}

      {txResult && (
        <>
          {/* <pre>{JSON.stringify(txResult, null, 2)}</pre> */}

          {connectedWallet && txResult && (
            <div className='App-link'>
              <a className='App-link'
                href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.result.txhash}`}
                target="_blank"
                rel="noreferrer"
              >
                Open Tx Result in Terra Explorer
              </a>
            </div>
          )}
        </>
      )}

      {txError && <pre>{txError}</pre>}

      {(!!txResult || !!txError) && (
        <button className='App-normalbtn'
          onClick={() => {
            setTxResult(null);
            setTxError(null);
          }}
        >
          Pay Again
        </button>
      )}

      {!connectedWallet && <p>Wallet not connected!</p>}

      {connectedWallet && !connectedWallet.availablePost && (
        <p>This connection does not support post()</p>
      )}
    </div>
  );
}
