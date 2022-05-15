// 파일첨부 - 파일명적용
function fileAttach(obj){
	var $fileExport = $(obj).siblings('input[type=text]');
	var fileValue = $(obj).val().split("\\");
	var fileName = fileValue[fileValue.length-1];
	$fileExport.val(fileName);
}

// 파일첨부 - 추가
function fileAttachAdd(obj){
	var $group = $(obj).closest('.form-file-group'),
		idx = $group.find('.form-file').length,
		id = 'sFilesAdd'+idx,
		html = '<div class="form-file">'+
				'	<input type="text" class="form-input" title="첨부된 파일명" readonly>'+
				'	<input type="file" name="'+idx+'" id="'+idx+'" value="찾아보기" tabindex="-1" aria-hidden="true" onchange="fileAttach(this)">'+
				'	<label for="'+idx+'">파일첨부</label>'+
				'	<button type="button" class="btn" onclick="fileAttachAdd(this)"><span>추가</span></button>'+
				'	<button type="button" class="btn" onclick="fileAttachDel(this)"><span>삭제</span></button>'+
				'</div>';
		$group.append(html);
}

// 파일첨부 - 삭제
function fileAttachDel(obj){
	$(obj).closest('.form-file').remove();
}

/*
	기능명칭 : SET FOCUS
	기능상세 : 모달 노출시 배경포커스 잠금
*/
function setFocus(action, $module) {
	var eleTabIdx = 'a, button, select, input, textarea'; //키보드제어 요소

	//포커스 활성화
	if (action == 'enable'){
		$('.is-ariaHidden').removeAttr('aria-hidden').removeClass('is-ariaHidden'); // 모든 아리아히든 초기화
		$('.is-tabindex-0').attr({'tabindex':'0'}).removeClass('is-tabindex-0');		// 모든 탭인덱스 0 이었던 요소 초기화
		$('.is-tabindex-none').removeAttr('tabindex').removeClass('is-tabindex-none');								// 모든 탭인덱스 없었던 요소 초기화
		console.log('setFocus enabled');

	//포커스 비활성
	} else if (action == 'disable'){
		var $siblings = $module.siblings();
		$siblings.not('[aria-hidden=true]').addClass('is-ariaHidden').attr({'aria-hidden':'true'});			// 자신의 아리아히든 설정
		$siblings.filter(eleTabIdx).not('[tabindex]').addClass('is-tabindex-none').attr({'tabindex':'-1'});	// 자신의 탭인덱스 없는요소 설정
		$siblings.filter('[tabindex=0]').addClass('is-tabindex-0').attr({'tabindex':'-1'});							// 자신의 탭인덱스 0 요소 설정
		$siblings.find(eleTabIdx).not('[tabindex]').addClass('is-tabindex-none').attr({'tabindex':'-1'});		// 자식의 탭인덱스 없는요소 설정
		$siblings.find('[tabindex=0]').addClass('is-tabindex-0').attr({'tabindex':'-1'});							// 자식의 탭인덱스 0 요소 설정
	}
}

var scrTop;
function setScroll(action) {
	var clsName = 'is-body-fixed';
	var $elePos = $('.wrapper');
	if (action == 'enable'){
		$('html, body').removeClass(clsName);
		$elePos.removeAttr('style');
		$('html, body').scrollTop(scrTop);
	} else if (action == 'disable'){
		scrTop = $(document).scrollTop();
		$('html, body').addClass(clsName);
		$elePos.css('top', scrTop * -1);
	}
}

/*
	기능명칭: Dimmer
*/
function dimmer($module, selector, action, callback) {
	var eleModule = '.dimmer';

	//열기
	if (action == 'open'){
		//딤이 없는경우 생성
		setScroll('disable'); //스크롤비활성
		setFocus('disable', $module); //초점비활성
		$(eleModule).show(0, function(){
			$(this).addClass(selector).addClass('is-active').removeAttr('hidden'); //딤활성화
		})
		$(eleModule).one(transitionend, function(){
			if ($(this).hasClass('is-active')){
				$(this).removeAttr('style');
				if (callback){ callback }
			}
		});
	}

	//닫기
	else if (action == 'close'){
		//딤을 호출하는 요소가 없는경우 닫기
		setScroll('enable'); //스크롤활성화
		setFocus('enable'); //초점활성화
		$(eleModule).removeClass('is-active'); //딤제거
		$(eleModule).one(transitionend, function(){
			if (!$(this).hasClass('is-active')){
				$(eleModule).attr('hidden','hidden');
				if (callback){ callback }
			}
		});
	}
}

// Ajax Common Function
function ajaxLoad(selector, frmName, callUrl, callback){
	var dataString = $("#"+frmName).serialize();

	if (callback) {
		$(selector).load(callUrl, dataString, callback);
	} else {
		$(selector).load(callUrl, dataString, function(data, textStatus, xhr){
			if (textStatus == 'success') {

			} else {
				if (xhr.status == 401) {
				} else if (xhr.status == 403) {
				}
				//alert(xhr.responseText);
				$(selector).html(xhr.responseText);
			}
		});
	}
}

function ajaxCall(selector, frmName, callUrl, callback) {
	var dataString = $("#"+frmName).serialize();

	$.ajax({
		type:"POST",
		url:callUrl,
		cache:false,
		async:false,
		dataType:"html",
		data:dataString,
		timeout:6000,
		success:function(data){
			if (selector !=="") {
				// 통신이 성공적으로 이루어졌을때 이 함수를 타게 된다.
				$(selector).html(data);
			}

			if (callback){
				callback;
			}

		},
		/*complete:function(data){
			//통신이 실패했어도 완료가 되었을때 이함수를 타게된다.
			// success 와 complete 둘 중 하나만 이용, 그렇지 않으면 두번실행
		},*/
		error:function(xhr, status, error){
			alert(xhr.responseText);
		}

	});
}

