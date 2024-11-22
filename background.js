chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkEtherscan",
    title: "Check Address on Etherscan",
    contexts: ["selection"],
  });
  chrome.contextMenus.create({
    id: "checkSolscan",
    title: "Check Address on Solscan",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === "checkEtherscan") {
    const selectedText = info.selectionText.trim();
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;

    if (ethAddressRegex.test(selectedText)) {
      const url = `https://etherscan.io/address/${selectedText}`;
      chrome.tabs.create({ url });
    } else {
      alert("Selected text is not a valid Ethereum address.");
    }
  }

  if (info.menuItemId === "checkSolscan") {
    const selectedText = info.selectionText.trim();
    const solAddressRegex = /^([A-Za-z0-9]{44})$/;

    if (solAddressRegex.test(selectedText)) {
      const url = `https://solscan.io/address/${selectedText}`;
      chrome.tabs.create({ url });
    } else {
      alert("Selected text is not a valid Solana address.");
    }
  }

});
