
export enum SegmentType {
  TEXT = 'TEXT',
  CODE = 'CODE'
}

export interface ContentSegment {
  type: SegmentType;
  content: string;
}
