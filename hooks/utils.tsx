import { Constants } from "@/constants/Strings";
import { FIREBASE_DB } from "@/firebaseConfig";
import { Level, Movement, SubMovement, SubSubMovement } from "@/models/Models";
import { theme } from "@/theme/theme";
import { DocumentData, DocumentReference, DocumentSnapshot, Timestamp, doc, getDoc } from "firebase/firestore";

const formatTimestampToString = function (timestamp: Timestamp): string {
    return new Date(timestamp.seconds! * 1000).toLocaleDateString("it-IT");
}

const countCompletedItems = (items: any[]): number => {
    return items.filter((item) => item.completionDate !== null).length;
};

const countInProgressItems = (items: any[]): number => {
    return items.filter((item) => item.activationDate !== null && item.completionDate === null).length;
};

const getParentDocumentsByRefPath = async (path: string): Promise<DocumentReference<DocumentData, DocumentData>[]> => {
    const segments = path.split('/');
    const documentRefs: DocumentReference<DocumentData, DocumentData>[] = [];
    let refPath = segments[0] + '/' + segments[1];

    for (let i = 2; i < segments.length; i += 2) {
        refPath += '/' + segments[i] + '/' + segments[i + 1];
        const documentRef = doc(FIREBASE_DB, refPath);
        documentRefs.push(documentRef);
    }

    return documentRefs;
}

const getItemBorderColor = (itemStatus: string) => {
    switch (itemStatus) {
      case Constants.Completed:
        return theme.colors.completed;
      case Constants.InProgress:
        return theme.colors.accent;
      case Constants.NotActive:
        return theme.colors.notactive;
      default:
        return theme.colors.notactive;
    }
  };

  const getBgStatusColor = (itemStatus: string) => {
    switch (itemStatus) {
      case Constants.Completed:
        return theme.colors.completed;
      case Constants.InProgress:
        return theme.colors.accent;
      case Constants.NotActive:
        return theme.colors.notactive;
      default:
        return theme.colors.notactive;
    }
  };

  const getLabelStatus = (itemStatus: string) => {
    switch (itemStatus) {
      case Constants.Completed:
        return 'COMPLETATO';
      case Constants.InProgress:
        return 'IN CORSO';
    }
  };

export { 
    formatTimestampToString, 
    countCompletedItems, 
    countInProgressItems, 
    getParentDocumentsByRefPath, 
    getItemBorderColor,
    getBgStatusColor,
    getLabelStatus 
};
