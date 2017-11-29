(function() {
DealershipBaseFormViewModel = function(group, subgroup){
    var self = this;

    self.group = ko.observable(group);
    self.subgroups = ko.observableArray([]);
    self.selectedSubgroup = ko.observable(subgroup);

    self.group.subscribe(function(newValue){
        if(newValue){
            getSubgroups(newValue);
        }else{
            self.subgroups([]);
        }
    });

    self.getUrl = ko.pureComputed(function() {
        if (self.group()){
            return "/dealerships/create-dealer-subgroup/" + self.group();
        }
        else {
            return "#";
        }
    });

    function getSubgroups(groupId, success){
       $.ajax({
          method: 'get',
          url: '/dealerships/api/subgroups/' + groupId + '/',
          success: function(data){
            self.subgroups(data.child_groups);
            if(success){
                success();
            }
          }
       })
    }

    (function(){
        if(self.group()){
            var selectedSub = self.selectedSubgroup();
            getSubgroups(self.group(), function(){
                self.selectedSubgroup(selectedSub);
            });
        }
    })();
}

;IncentiveAdminFormViewModel = function(oem, grouping, question){
    var self = this;

    self.oem = ko.observable(oem);
    self.groupings = ko.observableArray([]);
    self.selectedGrouping = ko.observable(grouping);
    self.questions = ko.observableArray([]);
    self.selectedQuestion = ko.observable(question);

    self.oem.subscribe(function(newValue){
        if(newValue){
            getGroupings(newValue);
        }else{
            self.groupings([]);
        }
    });

    self.selectedGrouping.subscribe(function(newValue){
        if(newValue){
            getQuestions(newValue);
        }
        else{
            self.questions([]);
        }
    });

    function getGroupings(oemId, success){
       $.ajax({
          method: 'get',
          url: '/incentives/api/groupings/' + oemId + '/',
          success: function(data){
            self.groupings(data.groupings);
            if(success){
                success();
            }
          }
       })
    }

    function getQuestions(groupingId, success){
       $.ajax({
          method: 'get',
          url: '/incentives/api/questions/' + groupingId + '/',
          success: function(data){
            self.questions(data.questions);
            if(success){
                success();
            }
          }
       })
    }

    (function(){
        if(self.oem()){
            var selectedGrouping = self.selectedGrouping();
            getGroupings(self.oem(), function(){
                self.selectedGrouping(selectedGrouping);
            });
            if(self.selectedGrouping()){
                var selectedQuestion = self.selectedQuestion();
                getQuestions(self.selectedGrouping(), function(){
                    self.selectedQuestion(selectedQuestion);
                });
            }
        }
    })();
}

;(function(){
    $(".row").find("select, :input:not([type='hidden']), textarea").first().focus();
})();

}).call(this);