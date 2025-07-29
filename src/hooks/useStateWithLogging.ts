import  { useState as originalUseState } from 'react';

let stateCallCount = 0;

export function useStateWithLogging<T>(initialValue: T) {
  stateCallCount++;
  console.log(`useState 호출 횟수: ${stateCallCount}`);
  return originalUseState(initialValue);
}