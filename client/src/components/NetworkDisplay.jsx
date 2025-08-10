import React from 'react';

// Utility component to safely render network information
export const NetworkDisplay = ({ network, networkDetails }) => {
  const getNetworkString = () => {
    // Handle network - prioritize testnet identification
    let networkStr = 'Testnet (Default)'; // Default to testnet for development
    
    if (typeof network === 'string') {
      if (network.toUpperCase().includes('TEST')) {
        networkStr = 'Testnet';
      } else if (network.toUpperCase().includes('MAIN') || network.toUpperCase().includes('PUBLIC')) {
        networkStr = 'Mainnet';
      } else {
        networkStr = network;
      }
    } else if (network && typeof network === 'object') {
      if (network.network) {
        const netName = String(network.network).toUpperCase();
        if (netName.includes('TEST')) {
          networkStr = 'Testnet';
        } else if (netName.includes('MAIN') || netName.includes('PUBLIC')) {
          networkStr = 'Mainnet';
        } else {
          networkStr = String(network.network);
        }
      } else if (network.name) {
        networkStr = String(network.name);
      }
    }
    
    // Handle network details - enhance testnet detection
    let detailsStr = '';
    if (networkDetails && typeof networkDetails === 'object') {
      if (typeof networkDetails.network === 'string') {
        const detailsNet = networkDetails.network.toUpperCase();
        if (detailsNet.includes('TEST')) {
          detailsStr = ' (Testnet)';
          networkStr = 'Testnet'; // Override if details confirm testnet
        } else if (detailsNet.includes('MAIN') || detailsNet.includes('PUBLIC')) {
          detailsStr = ' (Mainnet)';
          networkStr = 'Mainnet';
        } else {
          detailsStr = ` (${networkDetails.network})`;
        }
      } else if (networkDetails.networkPassphrase) {
        // Parse networkPassphrase for more accurate detection
        const passphrase = String(networkDetails.networkPassphrase);
        if (passphrase.includes('Test Network') || passphrase.includes('Testnet')) {
          detailsStr = ' (Testnet)';
          networkStr = 'Testnet';
        } else if (passphrase.includes('Public Global Stellar Network') || passphrase.includes('Mainnet')) {
          detailsStr = ' (Mainnet)';
          networkStr = 'Mainnet';
        } else if (passphrase.includes('Test')) {
          detailsStr = ' (Testnet)';
          networkStr = 'Testnet';
        } else if (passphrase.includes('Public')) {
          detailsStr = ' (Mainnet)';
          networkStr = 'Mainnet';
        }
      }
    }
    
    return networkStr + detailsStr;
  };
  
  return <span>{getNetworkString()}</span>;
};

// Utility function to safely stringify any value for display
export const safeStringify = (value, fallback = 'N/A') => {
  if (value === null || value === undefined) {
    return fallback;
  }
  
  if (typeof value === 'string') {
    return value;
  }
  
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return '[Object]';
    }
  }
  
  return String(value);
};

export default NetworkDisplay;
