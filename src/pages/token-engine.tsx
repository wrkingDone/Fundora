"use client"

import { useState, useEffect } from "react"
import { 
  Coins, 
  Trophy, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Clock,
  Gift,
  Sparkles,
  Wallet,
  Award
} from "lucide-react"
import Headers from "../components/headers"
import { createCreatorTokenMock } from "../../lib/hedera/hts"
import { mintSupportNFTMock, generateMetadataURI } from "../../lib/hedera/nft"
import { createMilestoneEngine, MilestoneEngine } from "../../lib/hedera/milestone"

interface CreatorTokenForm {
  campaignName: string
  creatorWallet: string
  totalSupply: string
  description: string
}

interface Backer {
  id: string
  wallet: string
  contributionAmount: string
  tokensReceived: string
  nftSerialNumber?: number
  bonusTokens?: string
  timestamp: number
}

export default function TokenEngine() {
  const [formData, setFormData] = useState<CreatorTokenForm>({
    campaignName: "",
    creatorWallet: "",
    totalSupply: "1000000",
    description: "",
  })

  const [tokenPreview, setTokenPreview] = useState<any>(null)
  const [milestoneEngine, setMilestoneEngine] = useState<MilestoneEngine | null>(null)
  const [campaignProgress, setCampaignProgress] = useState<any>(null)
  const [backers, setBackers] = useState<Backer[]>([])
  const [nftCollection, setNftCollection] = useState<any>(null)
  const [minting, setMinting] = useState(false)
  const [logs, setLogs] = useState<string[]>([])

  // Initialize milestone engine when form data changes
  useEffect(() => {
    if (formData.campaignName && formData.totalSupply) {
      const targetAmount = parseFloat(formData.totalSupply) || 1000000
      const engine = createMilestoneEngine(formData.campaignName, targetAmount)
      setMilestoneEngine(engine)
      setCampaignProgress(engine.getProgress())
    }
  }, [formData.campaignName, formData.totalSupply])

  // Update token preview when form changes
  useEffect(() => {
    if (formData.campaignName && formData.creatorWallet && formData.totalSupply) {
      const symbol = formData.campaignName
        .substring(0, 5)
        .toUpperCase()
        .replace(/\s+/g, "")
      
      setTokenPreview({
        name: `${formData.campaignName} Token`,
        symbol: symbol,
        totalSupply: formData.totalSupply,
        creatorWallet: formData.creatorWallet,
        description: formData.description,
      })
    }
  }, [formData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMintCreatorToken = async () => {
    if (!formData.campaignName || !formData.creatorWallet || !formData.totalSupply) {
      alert("Please fill in all required fields")
      return
    }

    setMinting(true)
    setLogs([])

    try {
      const result = await createCreatorTokenMock({
        campaignName: formData.campaignName,
        creatorWallet: formData.creatorWallet,
        totalSupply: parseInt(formData.totalSupply),
        description: formData.description,
      })

      setLogs(result.logs)
      setTokenPreview({
        ...tokenPreview,
        tokenId: result.tokenId,
        transactionId: result.transactionId,
        minted: true,
      })

      // Initialize milestone engine
      const targetAmount = parseFloat(formData.totalSupply)
      const engine = createMilestoneEngine(formData.campaignName, targetAmount)
      setMilestoneEngine(engine)
      setCampaignProgress(engine.getProgress())

      alert("Creator Token minted successfully! (Mock)")
    } catch (error: any) {
      setLogs([`Error: ${error.message}`])
      alert(`Error: ${error.message}`)
    } finally {
      setMinting(false)
    }
  }

  const simulateBackerContribution = () => {
    if (!milestoneEngine) {
      alert("Please mint a Creator Token first")
      return
    }

    const mockBacker: Backer = {
      id: `backer-${Date.now()}`,
      wallet: `0x${Math.random().toString(16).substr(2, 40)}`,
      contributionAmount: (Math.random() * 1000 + 100).toFixed(2),
      tokensReceived: (Math.random() * 500 + 50).toFixed(2),
      timestamp: Date.now(),
    }

    // Simulate NFT minting
    const metadataURI = generateMetadataURI({
      campaignId: formData.campaignName,
      contributorWallet: mockBacker.wallet,
      contributionAmount: mockBacker.contributionAmount,
      timestamp: mockBacker.timestamp,
      campaignName: formData.campaignName,
    })

    mintSupportNFTMock(
      formData.campaignName,
      mockBacker.wallet,
      metadataURI
    ).then((result) => {
      mockBacker.nftSerialNumber = result.serialNumber
      
      // Update progress
      const currentAmount = parseFloat(campaignProgress.currentAmount) + parseFloat(mockBacker.contributionAmount)
      milestoneEngine.updateProgress(currentAmount)
      const progress = milestoneEngine.getProgress()
      setCampaignProgress(progress)

      // Check for bonus tokens
      const unlockedMilestones = milestoneEngine.getUnlockedStatus().filter(m => m.unlocked)
      if (unlockedMilestones.length > 0) {
        const latestMilestone = unlockedMilestones[unlockedMilestones.length - 1]
        const bonus = milestoneEngine.calculateBonusTokens(
          parseFloat(mockBacker.contributionAmount),
          latestMilestone.milestoneId
        )
        mockBacker.bonusTokens = bonus.toFixed(2)
      }

      setBackers((prev) => [mockBacker, ...prev])
    })
  }

  const updateProgressManually = (amount: number) => {
    if (!milestoneEngine) return
    
    milestoneEngine.updateProgress(amount)
    const progress = milestoneEngine.getProgress()
    setCampaignProgress(progress)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-purple-50/20 to-blue-50/20 relative overflow-hidden">
      <Headers isScrolled={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pt-32">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Tokenized Crowdfunding Engine</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Creator Token & NFT System
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mint Creator Tokens, distribute NFT Support Badges, and unlock milestone-based rewards
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Creator Token Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-purple-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Mint Creator Token</h2>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Campaign Name *
                </label>
                <input
                  type="text"
                  name="campaignName"
                  value={formData.campaignName}
                  onChange={handleInputChange}
                  placeholder="My Awesome Project"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Creator Wallet Address *
                </label>
                <input
                  type="text"
                  name="creatorWallet"
                  value={formData.creatorWallet}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all font-mono text-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Supply *
                </label>
                <input
                  type="number"
                  name="totalSupply"
                  value={formData.totalSupply}
                  onChange={handleInputChange}
                  placeholder="1000000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe your campaign and token utility..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all resize-none"
                />
              </div>

              <button
                type="button"
                onClick={handleMintCreatorToken}
                disabled={minting || !formData.campaignName || !formData.creatorWallet}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-white rounded-lg font-bold hover:from-purple-700 hover:via-pink-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {minting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Minting...
                  </>
                ) : (
                  <>
                    <Coins className="w-5 h-5" />
                    Mint Creator Token (Mock)
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Token Preview */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-blue-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Token Preview</h2>
            </div>

            {tokenPreview ? (
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Token Name</span>
                    <span className="text-lg font-bold text-gray-900">{tokenPreview.name}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Symbol</span>
                    <span className="text-lg font-bold text-purple-600">{tokenPreview.symbol}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">Total Supply</span>
                    <span className="text-lg font-bold text-gray-900">
                      {parseInt(tokenPreview.totalSupply).toLocaleString()}
                    </span>
                  </div>
                  {tokenPreview.tokenId && (
                    <div className="mt-4 pt-4 border-t border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-gray-600">Token ID</span>
                        <span className="text-sm font-mono text-purple-600">{tokenPreview.tokenId}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-gray-600">Status</span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                          Minted
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {tokenPreview.description && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">{tokenPreview.description}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Coins className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Fill in the form to preview your token</p>
              </div>
            )}
          </div>
        </div>

        {/* Milestone Tracking */}
        {campaignProgress && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-green-100 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Milestone Tracking</h2>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-gray-600">Progress</span>
                <span className="text-2xl font-bold text-gray-900">
                  {campaignProgress.percentage.toFixed(2)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${Math.min(campaignProgress.percentage, 100)}%` }}
                />
              </div>
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{campaignProgress.currentAmount.toLocaleString()} raised</span>
                <span>{campaignProgress.targetAmount.toLocaleString()} target</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {campaignProgress.milestones.map((milestone: any) => (
                <div
                  key={milestone.id}
                  className={`p-4 rounded-lg border-2 ${
                    milestone.unlocked
                      ? "bg-green-50 border-green-300"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-600">
                      {milestone.label}
                    </span>
                    {milestone.unlocked ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {milestone.percentage}%
                  </div>
                  {milestone.unlocked && milestone.tokenBatch && (
                    <div className="text-xs text-green-600 font-semibold">
                      {milestone.tokenBatch.toLocaleString()} tokens unlocked
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => updateProgressManually(campaignProgress.currentAmount + 10000)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all"
              >
                Simulate +10k Contribution
              </button>
              <button
                onClick={simulateBackerContribution}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                Add Mock Backer
              </button>
            </div>
          </div>
        )}

        {/* NFT Support Badges */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-pink-100 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-pink-600 to-rose-600 rounded-lg flex items-center justify-center">
              <Gift className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">NFT Proof of Support</h2>
          </div>

          {nftCollection && (
            <div className="mb-6 p-4 bg-pink-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600">Collection ID</span>
                <span className="text-sm font-mono text-pink-600">{nftCollection.collectionId}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {backers.slice(0, 6).map((backer) => (
              <div
                key={backer.id}
                className="p-4 bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg border-2 border-pink-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  {backer.nftSerialNumber && (
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">
                      NFT #{backer.nftSerialNumber}
                    </span>
                  )}
                </div>
                <div className="text-xs font-mono text-gray-500 mb-2 truncate">
                  {backer.wallet}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Contribution</span>
                    <span className="font-bold text-gray-900">{backer.contributionAmount} HBAR</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Tokens</span>
                    <span className="font-bold text-purple-600">{backer.tokensReceived}</span>
                  </div>
                  {backer.bonusTokens && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Bonus</span>
                      <span className="font-bold text-green-600">+{backer.bonusTokens}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {backers.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              <Gift className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No backers yet. Simulate contributions to see NFT badges!</p>
            </div>
          )}
        </div>

        {/* Backers List */}
        {backers.length > 0 && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border-2 border-indigo-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Backers & Rewards</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Wallet</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Contribution</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Tokens</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">NFT Badge</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Bonus</th>
                  </tr>
                </thead>
                <tbody>
                  {backers.map((backer) => (
                    <tr key={backer.id} className="border-b border-gray-100 hover:bg-purple-50 transition-colors">
                      <td className="py-3 px-4 font-mono text-sm text-gray-600">
                        {backer.wallet.substring(0, 10)}...{backer.wallet.substring(34)}
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-900">
                        {backer.contributionAmount} HBAR
                      </td>
                      <td className="py-3 px-4 font-semibold text-purple-600">
                        {backer.tokensReceived}
                      </td>
                      <td className="py-3 px-4">
                        {backer.nftSerialNumber ? (
                          <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs font-bold">
                            #{backer.nftSerialNumber}
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">Pending</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {backer.bonusTokens ? (
                          <span className="font-semibold text-green-600">+{backer.bonusTokens}</span>
                        ) : (
                          <span className="text-gray-400 text-xs">-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Transaction Logs */}
        {logs.length > 0 && (
          <div className="mt-12 bg-gray-900 rounded-2xl shadow-xl p-6 border-2 border-gray-800">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Transaction Logs</h2>
            </div>
            <div className="bg-black rounded-lg p-4 max-h-64 overflow-y-auto">
              <div className="font-mono text-sm text-green-400 space-y-1">
                {logs.map((log, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <span className="text-gray-500">[{index + 1}]</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

