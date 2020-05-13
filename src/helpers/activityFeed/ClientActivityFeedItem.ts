import {
    CreatedAccountActivityFeedItem,
    LostTeamStreakActivityFeedItem,
    EditedTeamStreakDescriptionActivityFeedItem,
    EditedTeamStreakNameActivityFeedItem,
    JoinedTeamStreakActivityFeedItem,
    IncompletedTeamMemberStreakActivityFeedItem,
    CompletedTeamMemberStreakActivityFeedItem,
    CreatedSoloStreakActivityFeedItem,
    ArchivedSoloStreakActivityFeedItem,
    RestoredSoloStreakActivityFeedItem,
    DeletedSoloStreakActivityFeedItem,
    EditedSoloStreakNameActivityFeedItem,
    EditedSoloStreakDescriptionActivityFeedItem,
    CompletedSoloStreakActivityFeedItem,
    IncompletedSoloStreakActivityFeedItem,
    LostSoloStreakActivityFeedItem,
    CompletedChallengeStreakActivityFeedItem,
    IncompletedChallengeStreakActivityFeedItem,
    JoinedChallengeActivityFeedItem,
    ArchivedChallengeStreakActivityFeedItem,
    RestoredChallengeStreakActivityFeedItem,
    DeletedChallengeStreakActivityFeedItem,
    LostChallengeStreakActivityFeedItem,
    CreatedTeamStreakActivityFeedItem,
    ArchivedTeamStreakActivityFeedItem,
    RestoredTeamStreakActivityFeedItem,
    DeletedTeamStreakActivityFeedItem,
    FollowedUserActivityFeedItem,
} from '@streakoid/streakoid-models/lib/Models/ActivityFeedItemType';

export interface CreatedSoloStreakClientActivityFeedItem extends CreatedSoloStreakActivityFeedItem {
    title: string;
}

export interface ArchivedSoloStreakClientActivityFeedItem extends ArchivedSoloStreakActivityFeedItem {
    title: string;
}

export interface RestoredSoloStreakClientActivityFeedItem extends RestoredSoloStreakActivityFeedItem {
    title: string;
}

export interface DeletedSoloStreakClientActivityFeedItem extends DeletedSoloStreakActivityFeedItem {
    title: string;
}

export interface EditedSoloStreakNameClientActivityFeedItem extends EditedSoloStreakNameActivityFeedItem {
    title: string;
}

export interface EditedSoloStreakDescriptionClientActivityFeedItem extends EditedSoloStreakDescriptionActivityFeedItem {
    title: string;
}

export interface CompletedSoloStreakClientActivityFeedItem extends CompletedSoloStreakActivityFeedItem {
    title: string;
}

export interface IncompletedSoloStreakClientActivityFeedItem extends IncompletedSoloStreakActivityFeedItem {
    title: string;
}

export interface LostSoloStreakClientActivityFeedItem extends LostSoloStreakActivityFeedItem {
    title: string;
}

export interface CompletedChallengeStreakClientActivityFeedItem extends CompletedChallengeStreakActivityFeedItem {
    title: string;
}

export interface IncompletedChallengeStreakClientActivityFeedItem extends IncompletedChallengeStreakActivityFeedItem {
    title: string;
}

export interface JoinedChallengeClientActivityFeedItem extends JoinedChallengeActivityFeedItem {
    title: string;
}

export interface ArchivedChallengeStreakClientActivityFeedItem extends ArchivedChallengeStreakActivityFeedItem {
    title: string;
}

export interface RestoredChallengeStreakClientActivityFeedItem extends RestoredChallengeStreakActivityFeedItem {
    title: string;
}

export interface DeletedChallengeStreakClientActivityFeedItem extends DeletedChallengeStreakActivityFeedItem {
    title: string;
}

export interface LostChallengeStreakClientActivityFeedItem extends LostChallengeStreakActivityFeedItem {
    title: string;
}

export interface CreatedTeamStreakClientActivityFeedItem extends CreatedTeamStreakActivityFeedItem {
    title: string;
}

export interface ArchivedTeamStreakClientActivityFeedItem extends ArchivedTeamStreakActivityFeedItem {
    title: string;
}

export interface RestoredTeamStreakClientActivityFeedItem extends RestoredTeamStreakActivityFeedItem {
    title: string;
}

export interface DeletedTeamStreakClientActivityFeedItem extends DeletedTeamStreakActivityFeedItem {
    title: string;
}

export interface CompletedTeamMemberStreakClientActivityFeedItem extends CompletedTeamMemberStreakActivityFeedItem {
    title: string;
}

export interface IncompletedTeamMemberStreakClientActivityFeedItem extends IncompletedTeamMemberStreakActivityFeedItem {
    title: string;
}

export interface JoinedTeamStreakClientActivityFeedItem extends JoinedTeamStreakActivityFeedItem {
    title: string;
}

export interface EditedTeamStreakNameClientActivityFeedItem extends EditedTeamStreakNameActivityFeedItem {
    title: string;
}

export interface EditedTeamStreakDescriptionClientActivityFeedItem extends EditedTeamStreakDescriptionActivityFeedItem {
    title: string;
}

export interface LostTeamStreakClientActivityFeedItem extends LostTeamStreakActivityFeedItem {
    title: string;
}

export interface CreatedAccountClientActivityFeedItem extends CreatedAccountActivityFeedItem {
    title: string;
}

export interface FollowedUserClientActivityFeedItem extends FollowedUserActivityFeedItem {
    title: string;
}

type ClientActivityFeedItemType =
    | CreatedSoloStreakClientActivityFeedItem
    | ArchivedSoloStreakClientActivityFeedItem
    | RestoredSoloStreakClientActivityFeedItem
    | DeletedSoloStreakClientActivityFeedItem
    | EditedSoloStreakNameClientActivityFeedItem
    | EditedSoloStreakDescriptionClientActivityFeedItem
    | CompletedSoloStreakClientActivityFeedItem
    | IncompletedSoloStreakClientActivityFeedItem
    | LostSoloStreakClientActivityFeedItem
    | CompletedChallengeStreakClientActivityFeedItem
    | IncompletedChallengeStreakClientActivityFeedItem
    | JoinedChallengeClientActivityFeedItem
    | ArchivedChallengeStreakClientActivityFeedItem
    | RestoredChallengeStreakClientActivityFeedItem
    | DeletedChallengeStreakClientActivityFeedItem
    | LostChallengeStreakClientActivityFeedItem
    | CreatedTeamStreakClientActivityFeedItem
    | ArchivedTeamStreakClientActivityFeedItem
    | RestoredTeamStreakClientActivityFeedItem
    | DeletedTeamStreakClientActivityFeedItem
    | CompletedTeamMemberStreakClientActivityFeedItem
    | IncompletedTeamMemberStreakClientActivityFeedItem
    | JoinedTeamStreakClientActivityFeedItem
    | EditedTeamStreakNameClientActivityFeedItem
    | EditedTeamStreakDescriptionClientActivityFeedItem
    | LostTeamStreakClientActivityFeedItem
    | CreatedAccountClientActivityFeedItem
    | FollowedUserClientActivityFeedItem;

export default ClientActivityFeedItemType;
