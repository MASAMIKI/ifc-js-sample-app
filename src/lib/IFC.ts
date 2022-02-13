import type {IFCModel} from 'web-ifc-three/IFC/components/IFCModel';
import type {Scene} from 'three';

export type IFCInfo = {
  file: File
  ifcModel: IFCModel
}

export type SceneContext = {
  getScene: () => Scene
  getIfcInfoList: () => IFCInfo[]
  pushIfcInfoList: (ifcInfo: IFCInfo) => void,
  clearIfcInfoList: () => void,
}

export const key = Symbol();
