import { App, Plugin, Notice, MarkdownView, TFile, TFolder, WorkspaceLeaf } from 'obsidian';

class TabGroup {
	protected id: string;
	private name: string;
	private color: string;
	protected groupLeaves: WorkspaceLeaf[] = [];

	constructor(id: string, name: string, color: string) {
	  this.id = id;
	  this.name = name;
	  this.color = color;
	}

	getId() {
	  return this.id;
	}

	getName() {
	  return this.name;
	}

	setName(name: string) {
	  this.name = name;
	}

	getColor() {
	  return this.color;
	}

	setColor(color: string) {
	  this.color = color;
	  this.updateLeavesColor();
	}

	addLeafToGroup(leaf: WorkspaceLeaf) {
	  if (!this.groupLeaves.includes(leaf)) {
		this.groupLeaves.push(leaf);
		this.updateLeavesColor();
	  }
	}

	removeLeafFromGroup(leaf: WorkspaceLeaf) {
	  const index = this.groupLeaves.indexOf(leaf);
	  if (index !== -1) {
		this.groupLeaves.splice(index, 1);
		this.updateLeavesColor();
	  }
	}

	updateLeavesColor() {
	  this.groupLeaves.forEach((leaf) => {
		leaf.setEphemeralState({
		  backgroundColor: this.color,
		});
	  });
	}

	getGroupLeaves() {
	  return this.groupLeaves;
	}
}

  
class ModifiedTabGroup extends TabGroup {
	constructor(id: string, name: string, color: string, groupLeaves: WorkspaceLeaf[]) {
	  super(id, name, color);
	  this.groupLeaves = groupLeaves;
	}
  
	getId() {
	  return this.id;
	}
  
	addLeafToGroup(leaf: WorkspaceLeaf) {
	  this.groupLeaves.push(leaf);
	  leaf.setEphemeralState({ tabGroup: this });
	  this.updateLeavesColor();
	}
  
	removeLeafFromGroup(leaf: WorkspaceLeaf) {
	  const leafIndex = this.groupLeaves.indexOf(leaf);
	  if (leafIndex >= 0) {
		this.groupLeaves.splice(leafIndex, 1);
		leaf.setEphemeralState({ tabGroup: undefined });
		this.updateLeavesColor();
	  }
	}
  
	updateLeavesColor() {
	  const leaves = this.getGroupLeaves();
	  for (let i = 0; i < leaves.length; i++) {
		leaves[i].setEphemeralState({ backgroundColor: this.getColor });
	  }
	}
  
	getGroupLeaves() {
	  return this.groupLeaves;
	}
  }
  

  function getTabGroupData(leaf: WorkspaceLeaf): { id: string } | undefined {
	const data = leaf.getEphemeralState();
	return data.tabGroup ? { id: data.tabGroup.getId() } : undefined;
  }

interface MyLeafData  {
	tabGroup?: TabGroup;
}

class TabGroupManager {
	private groups: ModifiedTabGroup[] = [];

	addGroup(group: ModifiedTabGroup) {
	  this.groups.push(group);
	}

	getGroupById(id: string) {
	  return this.groups.find((group) => group.getId() === id);
	}
}

const tabGroupManager = new TabGroupManager();

function createTabGroup(name: string, color: string, groupLeaves: WorkspaceLeaf[]) {
	const id = Math.random().toString(36).substring(2);
	const tabGroup = new ModifiedTabGroup(id, name, color, groupLeaves);
	tabGroupManager.addGroup(tabGroup);
	return tabGroup;
  }
  

function setTabGroup(leaf: WorkspaceLeaf, group: ModifiedTabGroup): void {
    if (leaf && group) {
        leaf.setEphemeralState({ tabGroup: group });
    }
}


  function setLeafGroupData(leaf: WorkspaceLeaf, group: ModifiedTabGroup): void {
	const data = leaf.getEphemeralState();
	data.group = group;
	leaf.setEphemeralState(data);
  }
  

  


  class WorkspaceTab {
	leaf: WorkspaceLeaf;
	group: ModifiedTabGroup;
  
	constructor(leaf: WorkspaceLeaf, group: ModifiedTabGroup) {
	  this.leaf = leaf;
	  this.group = group;
	}
  }
  
    function setTabGroupData(leaf: WorkspaceLeaf, group: TabGroup): void {
	// Cast the leaf to a type that includes the tabGroup property
	const myLeaf = leaf as WorkspaceLeaf & MyLeafData;
	// Store the entire TabGroup object as a property on the WorkspaceLeaf instance
	myLeaf.tabGroup = group;
  }

  function clearTabGroupData(leaf: WorkspaceLeaf) {
	const data = leaf.getEphemeralState();
	delete data.tabGroup;
	leaf.setEphemeralState(data);
  }
  
  
  	function linkWithTab(leaf: WorkspaceLeaf, groupLeaves: WorkspaceLeaf[]) {
	const group = createTabGroup("My Tab Group", "#ff0000", groupLeaves) as ModifiedTabGroup;
	group.addLeafToGroup(leaf);
	setTabGroupData(leaf, group);
  
	this.registerEvent(this.app.workspace.on("layout-ready", () => {
		const unlinkedLeaves = this.app.workspace.getLeavesOfType("unlinked");
		for (const leaf of unlinkedLeaves) {
			const tabGroupData = getTabGroupData(leaf);
			if (tabGroupData) {
			  const tabGroup = tabGroupManager.getGroupById(tabGroupData.id);
			  if (tabGroup) {
				tabGroup.removeLeafFromGroup(leaf);
			  }
			  clearTabGroupData(leaf);		}
	  }}));
  
	leaf.setEphemeralState({
	  linkWithTab: {
		group,
		groupLeaves: [leaf],
	  },
	});
  
	new Notice('Linked with Tab');
  }
  