export interface NFTMetadata {
  campaignId: string;
  contributorWallet: string;
  contributionAmount: string;
  timestamp: number;
  campaignName: string;
}

export interface MintNFTResult {
  serialNumber: number;
  transactionId: string;
}

export function generateMetadataURI(data: NFTMetadata): string {
  // Mock metadata URI generation
  const base64Data = Buffer.from(JSON.stringify(data)).toString('base64');
  return `data:application/json;base64,${base64Data}`;
}

export async function mintSupportNFTMock(
  campaignName: string, 
  wallet: string, 
  metadataURI: string
): Promise<MintNFTResult> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    serialNumber: Math.floor(Math.random() * 10000) + 1,
    transactionId: `0x${Math.random().toString(16).substr(2, 64)}`,
  };
}
