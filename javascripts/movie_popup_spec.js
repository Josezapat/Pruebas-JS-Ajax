// spec/javascripts/movie_popup_spec.js

describe('MoviePopup', function() {
    describe('setup', function() {
      beforeEach(function() {
        // Cargamos las fixtures antes de cada prueba
        fixture.load('movie_row.html');
      });
  
      it('calls correct URL', function() {
        spyOn($, 'ajax');
        $('#movies a').trigger('click');
        expect($.ajax.calls.mostRecent().args[0].url).toEqual('/movies/1');
      });
  
      describe('when successful server call', function() {
        beforeEach(function() {
          // Supongamos que tienes un archivo movie_info.html en spec/javascripts/fixtures
          fixture.load('movie_info.html');
  
          spyOn($, 'ajax').and.callFake(function(ajaxArgs) {
            ajaxArgs.success(fixture.read('movie_info.html'), '200');
          });
  
          $('#movies a').trigger('click');
        });
  
        it('makes #movieInfo visible', function() {
          expect($('#movieInfo')).toBeVisible();
        });
  
        it('places movie title in #movieInfo', function() {
          expect($('#movieInfo').text()).toContain('Casablanca');
        });
      });
    });
  });
  
  
  
