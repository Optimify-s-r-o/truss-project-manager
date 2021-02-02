enum Hub {
	RequestNewTree = "RequestNewTree",
	RequestTreeWithSelection = "RequestTreeWithSelection",
	RequestFilters = "RequestFilters",
	ReceivedTree = "ReceivedTree",
	FiltersChanged = "FiltersChanged",
	ReceivedFilters = "ReceivedFilters",
	JobChanged = "JobChanged",
	RequestJob = "RequestJob",
	JobIdChanged = "JobIdChanged",
	OpenJob = "OpenJob",
	ReceivedJob = "ReceivedJob",
	CloseJob = "CloseJob",
	TreeSelection = "TreeSelection",
	TreeChanged = "TreeChanged",
	RequestTree = "RequestTree",
	TreeLost = "TreeLost",
	RequestTreeSelection = "RequestTreeSelection",
	ResetTree = "ResetTree",
	ReceivedProject = "ReceivedProject",
	ProjectChanged = "ProjectChanged",
	RequestProject = "RequestProject",
	CloseProject = "CloseProject",
	OpenProject = "OpenProject",
	ReceivedTruss = "ReceivedTruss",
	TrussChanged = "TrussChanged",
	RequestTruss = "RequestTruss",
	CloseTruss = "CloseTruss",
	OpenTruss = "OpenTruss",
}

enum HubApi {
	Tree = "/hubs/tree",
	Job = "/hubs/job",
	Project = "/hubs/project",
	Truss = "/hubs/truss",
}

export { Hub, HubApi };
