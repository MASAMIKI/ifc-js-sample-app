import type {IFCModel} from 'web-ifc-three/IFC/components/IFCModel';
import type {IfcViewerAPI} from 'web-ifc-viewer';

export type IFCInfo = {
  file: File
  ifcModel: IFCModel
}

export type SceneContext = {
  getViewer: () => IfcViewerAPI
  getIfcInfoList: () => IFCInfo[]
  pushIfcInfoList: (ifcInfo: IFCInfo) => void,
  removeIfcInfoList: (ifcInfo: IFCInfo) => void,
  clearIfcInfoList: () => void,
}

export const key = Symbol();
