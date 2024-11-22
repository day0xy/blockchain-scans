chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkEtherscan",
    title: "Check Ethereum Address on Etherscan",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "checkSolscan",
    title: "Check Solana Address on Solscan",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "checkBscScan",
    title: "Check BSC Address on BscScan",
    contexts: ["selection"],
  });

  chrome.contextMenus.create({
    id: "checkBitcoin",
    title: "Check Bitcoin Address on Blockchain.com",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  const selectedText = info.selectionText.trim();
  const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
  const solAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/; // Solana address pattern
  const bscAddressRegex = /^0x[a-fA-F0-9]{40}$/; // BSC address pattern
  const bitcoinAddressRegex = /^(1|3|bc1)[a-zA-HJ-NP-Z0-9]{25,39}$/; // Bitcoin address pattern

  if (
    info.menuItemId === "checkEtherscan" &&
    ethAddressRegex.test(selectedText)
  ) {
    const url = `https://etherscan.io/address/${selectedText}`;
    chrome.tabs.create({ url });
  } else if (
    info.menuItemId === "checkSolscan" &&
    solAddressRegex.test(selectedText)
  ) {
    const url = `https://solscan.io/account/${selectedText}`;
    chrome.tabs.create({ url });
  } else if (
    info.menuItemId === "checkBscScan" &&
    bscAddressRegex.test(selectedText)
  ) {
    const url = `https://bscscan.com/address/${selectedText}`;
    chrome.tabs.create({ url });
  } else if (
    info.menuItemId === "checkBitcoin" &&
    bitcoinAddressRegex.test(selectedText)
  ) {
    const url = `https://www.blockchain.com/btc/address/${selectedText}`;
    chrome.tabs.create({ url });
  } else {
    alert(
      "Selected text is not a valid Ethereum, Solana, BSC, or Bitcoin address."
    );
  }
});
