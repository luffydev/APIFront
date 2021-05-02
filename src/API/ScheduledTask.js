
class ScheduledTask
{
    mScheduleList = {};

    addTask(pID, pFunction, pTimer)
    {
        if(!(pID in this.mScheduleList))
        {
            this.mScheduleList[pID] = {timer : null, func: pFunction};
            this.mScheduleList[pID].timer = setInterval(() => { pFunction() }, pTimer);
        }
    }

    stopTask(pID)
    {
        if(pID in this.mScheduleList && 'timer' in this.mScheduleList[pID])
        {
            clearInterval(this.mScheduleList[pID].timer);
            delete this.mScheduleList[pID];
        }
    }
}

export default ScheduledTask;