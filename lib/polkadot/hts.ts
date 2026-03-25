export interface CreatorTokenMockParams {
  campaignName: string;
  creatorWallet: string;
  totalSupply: number;
  description: string;
}

export interface CreatorTokenMockResult {
  logs: string[];
  tokenId: string;
  transactionId: string;
}

export async function createCreatorTokenMock(params: CreatorTokenMockParams): Promise<CreatorTokenMockResult> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return {
    logs: [
      `Connecting to Polkadot network...`,
      `Validating creator wallet: ${params.creatorWallet}`,
      `Minting ${params.totalSupply} ${params.campaignName} tokens...`,
      `Transaction confirmed.`,
    ],
    tokenId: `0x${Math.random().toString(16).substr(2, 8)}`,
    transactionId: `0x${Math.random().toString(16).substr(2, 64)}`,
  };
}
